import React from 'react';
import { createMockProvidedChart } from '../../test-utils'
import Legend from '../../../src/components/Legend/Legend';

describe('<Legend />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    const { chartStubs, getChart, needsRedraw } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;

    testContext.propsFromProviders = {
      getChart,
      needsRedraw
    };
  });

  describe('when mounted', () => {
    it('add legend using the Highcharts update method', () => {
      mount(<Legend {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        legend: expect.objectContaining({
          enabled: true
        })
      }, false);
      expect(testContext.propsFromProviders.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('updates the legend with the passed props', () => {
      mount(
        <Legend align="left" y={20} {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        legend: expect.objectContaining({
          enabled: true,
          align: 'left',
          y: 20
        })
      }, false);
      expect(testContext.propsFromProviders.needsRedraw).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = mount(
        <Legend {...testContext.propsFromProviders} />
      );
      wrapper.setProps({ backgroundColor: 'red' });
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(expect.objectContaining({
        legend: {
          backgroundColor: 'red'
        }
      }), false);
      expect(testContext.propsFromProviders.needsRedraw).toHaveBeenCalledTimes(2);
    });
  });

  describe('when unmounted', () => {
    it('should disable the Legend', () => {
      const wrapper = mount(<Legend {...testContext.propsFromProviders} />);
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(expect.objectContaining({
        legend: {
          enabled: false
        }
      }), false);
      expect(testContext.propsFromProviders.needsRedraw).toHaveBeenCalledTimes(2);
    });
  });
});
