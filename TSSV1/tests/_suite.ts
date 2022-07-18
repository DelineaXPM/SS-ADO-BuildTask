import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';

describe('TSS task tests', function () {

    before(function () {

    });

    after(() => {

    });

    it('should succeed with proper credentials and existing secret', function (done: Mocha.Done) {
        this.timeout(5000);

        let tp = path.join(__dirname, 'success.js');
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

        tr.run();
        console.log(tr.succeeded);
        assert.strictEqual(tr.succeeded, true, 'should have succeeded');
        assert.strictEqual(tr.warningIssues.length, 0, "should have no warnings");
        assert.strictEqual(tr.errorIssues.length, 0, "should have no errors");
        console.log(tr.stdout);
        done();
    });

    it('should fail if tool returns 1', function (done: Mocha.Done) {
        this.timeout(5000);

        let tp = path.join(__dirname, 'failure.js');
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

        tr.run();
        console.log(tr.succeeded);
        assert.strictEqual(tr.succeeded, false, 'should have failed');
        assert.strictEqual(tr.warningIssues, 0, "should have no warnings");
        assert.strictEqual(tr.errorIssues.length, 1, "should have 1 error issue");
        done();
    });
});