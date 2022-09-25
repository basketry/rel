import * as build from './test-utils';
import { lit } from './test-utils';

import { parse } from './rel';
import { Rel } from './types';

describe('rel', () => {
  it('works', () => {
    // ARRANGE
    const parameter = build.parameter({
      name: lit('widgetId'),
      meta: [build.foreignKey('widget', 'id')],
    });
    const method = build.method({ parameters: [parameter] });
    const int = build.int({ methods: [method] });
    const service = build.service({ interfaces: [int] });

    // ACT
    const result = parse(parameter, service);

    // ASSERT
    expect(result).toEqual<Rel>({
      meta: {
        kind: 'foreignKey',
        type: 'widget',
        property: 'id',
        many: false,
        localProperty: 'widgetId',
      },
      violations: [],
    });
  });
});
