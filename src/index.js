
import * as apiTest from './api-test';
import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const observer = [
    'bindCallback', 'bindNodeCallback', 'combineLatest', 'concat', 'defer',
    'empty', 'forkJoin', 'from', 'fromEvent', 'fromEventPattern',
    'generate', 'identity', 'iif', 'interval', 'isObservable',
    'merge', 'never', 'noop', 'of', 'onErrorResumeNext',
    'pairs', 'pipe', 'race', 'range', 'throwError',
    'timer', 'using', 'zip'
];

const operators = [
    'audit', 'auditTime', 'buffer', 'bufferCount', 'bufferTime',
    'bufferToggle', 'bufferWhen', 'catchError', 'combineAll',
    'combineLatest', 'concat', 'concatAll', 'concatMap', 'concatMapTo',
    'count', 'debounce', 'debounceTime', 'defaultIfEmpty', 'delay',
    'delayWhen', 'dematerialize', 'distinct', 'distinctUntilChanged', 'distinctUntilKeyChanged',
    'elementAt', 'endWith', 'every', 'exhaust', 'exhaustMap', 'expend',
    'filter', 'finalize', 'find', 'findIndex', 'first',
    'flatMap', 'groupBy', 'ignoreElements', 'isEmpty', 'last',
    'map', 'mapTo', 'materialize', 'max', 'merge',
    'mergeAll', 'mergeMap', 'mergeMapTo', 'mergeScan', 'min',
    'multicast', 'observerOn', 'onErrorResumeNext', 'pairwise', 'partition',
    'pluck', 'public', 'publishBehavior', 'publishLast', 'publishReplay',
    'race', 'reduce', 'refCount', 'repeat', 'repeatWhen',
    'retry', 'retryWhen', 'sample', 'sampleTime', 'scan',
    'sequenceEqual', 'share', 'shareReplay', 'single', 'skip',
    'skipLast', 'skipUntil', 'skipWhile', 'startWith', 'subscribeOn',
    'switchAll', 'switchMap', 'switchMapTo', 'take', 'takeLast',
    'takeUntil', 'takeWhile', 'tap', 'throttle', 'throttleTime',
    'timeInterval', 'timeout', 'timeoutWith', 'timestamp', 'toArray',
    'window', 'windowCount', 'windowTime', 'windowToggle', 'windowWhen',
    'withLatestFrom', 'zip', 'zipAll'
];

const createBtns = (list, parentElemClassName) => {
    let btn;
    const fragment = document.createDocumentFragment();
    const parentElem = document.createElement('div');
    parentElem.className = parentElemClassName;
    list.forEach(item => {
        btn = document.createElement('button');
        btn.innerText = item;
        const funcName = item + parentElemClassName;
        if (apiTest[funcName] === undefined) {
            btn.setAttribute('disabled', 'true')
        }
        parentElem.appendChild(btn);
    });
    fragment.appendChild(parentElem);
    document.body.appendChild(fragment);
};

createBtns(observer, 'Observer');
createBtns(operators, 'Operator');

fromEvent(window, 'click').pipe(
    map(event => event.target),
    filter(target => target.nodeName.toLowerCase() === 'button')
).subscribe(target => {
    const parentElemClassName = target.parentElement.classList[0];
    const funcName = target.innerText + parentElemClassName;
    console.log("%c" + target.innerText + '--------', "color: cornflowerblue");
    apiTest[funcName]();
});
