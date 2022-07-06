import { InputStream, CommonTokenStream } from 'antlr4';
import PoolQueryParser from '../ANTLR/PoolQueryParser';
import PoolQueryLexer from '../ANTLR/PoolQueryLexer';
import PoolQueryLangErrorListener from './PoolQueryLangErrorListener';

export function parse(code) {
  const inputStream = new InputStream(code, undefined);
  const lexer = new PoolQueryLexer.PoolQueryLexer(inputStream);
  lexer.removeErrorListeners();
  const errorListener: any = new PoolQueryLangErrorListener();
  lexer.addErrorListener(errorListener);
  const tokenStream = new CommonTokenStream(lexer, undefined);
  const parser = new PoolQueryParser.PoolQueryParser(tokenStream);
  parser.removeErrorListeners();
  parser.addErrorListener(errorListener);
  const poolQueryContext = parser.poolQuery();
  const errors = errorListener.getErrors();
  return { poolQueryContext, errors };
}
