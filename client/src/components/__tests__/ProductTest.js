import React from 'react';
import Product from '../Product';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('Product Component', () => {
    const addItemFn = jest.fn();
    const testProps = {
        addItem: addItemFn,
        product: {
            belongsToBrand: 2,
            id: '37b4d1b7-ed3c-4d28-91e0-ef0fb89b2b12',
            name: 'VENIAM Swimming Shorts',
            price: 706.2,
            description: 'Excepteur non Lorem aliqua esse irure veniam elit labore culpa velit nostrud ad nostrud.',
            color: 'deserunt',
            size: 'L',
            quantity: 1,
            image: 'my_test_image.png'
        }
    };
    it('renders correctly', () => {
        const renderer = new ShallowRenderer()
        renderer.render(<Product product={testProps.product} addItem={addItemFn} />);
        const renderedOutput = renderer.getRenderOutput();
        expect(renderedOutput.type).toBe('div');
        expect(renderedOutput).toMatchSnapshot();
    });
})

