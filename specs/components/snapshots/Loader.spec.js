import React from 'react';
import renderer from 'react-test-renderer';

import { Loader } from '../../../client/src/components/Loader';

describe('Snapshot', ()=> {
    it('should render correctly', () => {
       const tree = renderer.create(<Loader/>).toJSON();
       
        expect(tree).toMatchSnapshot();
    });
});