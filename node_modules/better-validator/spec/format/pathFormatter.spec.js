const Validator = require('../../src');
const PathFormatter = Validator.format.path.PathFormatter;

const formatter = new PathFormatter();

describe('pathFormatter', () => {
  it('will return empty string if path is empty', () => {
    expect(formatter.format(null)).toEqual('');
    expect(formatter.format([])).toEqual('');
  });

  it('will join properties with . by default', () => {
    expect(formatter.format(['a'])).toEqual('a');
    expect(formatter.format(['a', 'b'])).toEqual('a.b');
    expect(formatter.format(['a', 'b', 'c'])).toEqual('a.b.c');
  });

  it('will use separator from options when joining properties', () => {
    const customFormatter = new PathFormatter({separator: '/'});
    expect(customFormatter.format(['a'])).toEqual('a');
    expect(customFormatter.format(['a', 'b'])).toEqual('a/b');
    expect(customFormatter.format(['a', 'b', 'c'])).toEqual('a/b/c');
  });

  it('will use separator and initialSeparator from options when joining properties', () => {
    const customFormatter = new PathFormatter({separator: '/', initialSeparator: './'});
    expect(customFormatter.format(['a'])).toEqual('./a');
    expect(customFormatter.format(['a', 'b'])).toEqual('./a/b');
    expect(customFormatter.format(['a', 'b', 'c'])).toEqual('./a/b/c');
  });

  it('will format indexers', () => {
    expect(formatter.format(['a', 2])).toEqual('a[2]');
    expect(formatter.format(['a', 2, 'b'])).toEqual('a[2].b');
    expect(formatter.format(['a', 'b', 2])).toEqual('a.b[2]');
    expect(formatter.format(['a', 'b', 2, 'c'])).toEqual('a.b[2].c');
  });

  it('will format request query special case', () => {
    expect(formatter.format(['?', 'a'])).toEqual('?a');
    expect(formatter.format(['?', 'a', 2])).toEqual('?a[2]');
  });

});
