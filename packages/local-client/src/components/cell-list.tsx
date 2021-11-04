import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state';
import { CellsState } from '../state/reducers/cellsReducer';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import { useActions } from '../hooks/use-actions';
import './cell-list.css';

const CellList: React.FC = () => {
	const cellState = useSelector(
		(state: RootState) => state.cells
	) as CellsState;
	const { order, data } = cellState;
	const cells = order.map((id) => data[id]);

	const { fetchCells, saveCells } = useActions();

	useEffect(() => {
		fetchCells();
	}, []);

	useEffect(() => {
		saveCells();
	}, [JSON.stringify(cells)]);

	const renderedCells = cells.map((cell) => (
		<Fragment key={cell.id}>
			<CellListItem cell={cell} />
			<AddCell previousCellId={cell.id} />
		</Fragment>
	));
	return (
		<div className='cell-list'>
			<AddCell forceVisible={cells.length === 0} previousCellId={null} />
			{renderedCells}
		</div>
	);
};

export default CellList;
