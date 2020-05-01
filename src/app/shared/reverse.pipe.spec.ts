import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should reverse the inputs', () => {
    const pipe = new ReversePipe();
    expect(pipe.transform('Reverse')).toEqual('esreveR');
  });
});
