expect(2 + 2).toBe(4);

expect({ a: 1 }).toEqual({ a: 1 });

expect('text').toBeTruthy();
expect(null).toBeFalsy();

expect(null).toBeNull();
expect(undefined).toBeUndefined();

expect(10).toBeGreaterThan(5);

expect(['a', 'b']).toContain('a');
expect('hello').toContain('ell');

expect('user@example.com').toMatch(/^\S+@\S+\.\S+$/);

expect(() => { throw new Error('Fail') }).toThrow('Fail');

await expect(Promise.resolve('ok')).resolves.toBe('ok');
await expect(Promise.reject('error')).rejects.toBe('error');

// expect(screen.getByText('Submit')).toBeInTheDocument();

// expect(screen.getByRole('button')).toBeVisible();

// expect(screen.getByTestId('title')).toHaveTextContent('Hello');

// expect(screen.getByRole('link')).toHaveAttribute('href', '/about');