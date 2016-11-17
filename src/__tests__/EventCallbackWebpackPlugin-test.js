import EventCallbackWebpackPlugin from '../EventCallbackWebpackPlugin';
// eslint-disable-next-line node/no-unpublished-import
import test from 'ava';
// eslint-disable-next-line node/no-unpublished-import
import webpack from 'webpack';
import webpackConfigBase from './config/config-base';

test.cb('should execute successfully', (t) => {
    t.plan(3);

    webpackConfigBase.plugins = [
        new EventCallbackWebpackPlugin('done', (stats) => {
            t.true(Array.isArray(stats));
            t.true(stats[0].compilation.errors.length === 0);
        })
    ];

    const webpackOptions = Object.assign({}, webpackConfigBase);

    webpack(webpackOptions, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length === 0);

        t.end();
    });
});

test('should execute failed when not passed `event` option', (t) => {
    t.throws(() => new EventCallbackWebpackPlugin(), 'Require `event` argument');
});

test('should execute failed when not passed `callback` option', (t) => {
    t.throws(() => new EventCallbackWebpackPlugin('done'), 'Require `callback` argument');
});
