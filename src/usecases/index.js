import Category2Keyword from './Category2Keyword';
import CountNotZero from './CountNotZero';
import CountZero from './CountZero';
import CountMinus from './CountMinus';
import EditAll from './EditAll';

export const editors = {
  Category2Keyword,
  CountNotZero,
  CountZero,
  CountMinus,
};

export const Edit = EditAll;

export default new EditAll(Object.values(editors).map(e => new e()));