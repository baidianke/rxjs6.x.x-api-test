import {
    bindCallback, of, combineLatest,
    interval, range, concat,
    defer, empty, forkJoin,
    fromEvent, fromEventPattern, iif,
    merge, onErrorResumeNext, pairs,
    race, throwError, timer, zip, from
} from 'rxjs';
import {
    delay, startWith, take,
    mergeMap, map, auditTime,
    buffer, bufferCount, bufferTime,
    bufferToggle, bufferWhen, catchError,
    combineAll, concatMap, concatMapTo,
    count, debounce, debounceTime,
    defaultIfEmpty, delayWhen, distinct,
    distinctUntilChanged, distinctUntilKeyChanged, elementAt,
    endWith, every, exhaust,
    exhaustMap, expand, filter,
    finalize, find, findIndex,
    first, flatMap, groupBy,
    ignoreElements, isEmpty,
    last, mapTo, materialize,
    max, reduce, mergeMapTo,
    mergeScan, min, multicast,
    observeOn, pairwise,
    partition, pluck, publish,
    publishBehavior, publishLast, publishReplay,
    refCount, repeat,
    repeatWhen, retry, retryWhen,
    sample, sampleTime, scan,
    sequenceEqual, share, shareReplay,
    single, skip, skipLast,
    skipUntil, skipWhile,
    subscribeOn, switchAll,switchMap,
    switchMapTo, takeLast, takeUntil,
    takeWhile, tap, throttle,
    throttleTime, timeInterval, timeout,
    timeoutWith, timestamp, toArray,
    window, windowCount, windowTime,
    windowToggle, windowWhen, withLatestFrom,
    zipAll,  mergeAll
} from 'rxjs/operators'

/**
 * bindCallback
 * Converts a callback API to a function that returns an Observable.
 * https://rxjs-dev.firebaseapp.com/api/index/bindCallback
 */
export function bindCallbackObserver() {
    const funcWithCallback = (args ,cb) => {
        cb(args);
    };
    const boundSomeFunction$ = bindCallback(funcWithCallback);
    boundSomeFunction$(111).subscribe(value => console.log(value))
}

/**
 * combineLatest
 * Combines multiple Observables to create an Observable whose values are
 * calculated from the latest values of each of its input Observables.
 */
export function combineLatestObserver() {
    const observables = [1, 5, 10].map(
        n => of(n).pipe(
            delay(n * 1000),
            startWith(0)
        )
    );
    combineLatest(observables)
        .subscribe(value => console.log(value))
}

/**
 * concat
 * Creates an output Observable which sequentially emits all values from given
 * Observable and then moves on to the next.
 */
export function concatObserver() {
    const timer$ = interval(1000).pipe(take(4));
    const sequence$ = range(1, 10);
    concat(timer$, sequence$).subscribe(x => console.log(x))
}

/**
 * defer
 * Creates an Observable that, on subscribe, calls an Observable factory to
 * make an Observable for each new Observer.
 * Creates the Observable lazily, that is, only when it is subscribed.
 */
export function deferObserver() {
    const clicksOrInterval$ = defer(() => {
        const randomInt = Math.ceil(Math.random() * 10);
        console.log('randomInt', randomInt);
        return interval(1000).pipe(take(randomInt))
    });
    clicksOrInterval$.subscribe(x => console.log(x))
}

/**
 * empty
 * Creates an Observable that emits no items to the Observer and immediately
 * emits a complete notification.
 */
export function emptyObserver() {
    const result$ = interval(1000).pipe(
        take(7),
        mergeMap(x => x % 2 === 1 ? of ('a', 'b', 'c') : empty())
    );
    result$.subscribe(x => console.log(x))
}

/**
 * forkJoin
 * Joins last values emitted by passed Observables.
 * [3, 10]
 */
export function forkJoinObserver() {
    const timer$ = interval(1000).pipe(take(4));
    const sequence$ = range(1, 10);
    forkJoin(timer$, sequence$).subscribe(value => console.log(value))
}

/**
 * fromEvent
 * Creates an Observable that emits events of a specific type
 * coming from the given event target.
 */
export function fromEventObserver() {
    const observer$ = fromEvent(document, 'click');
    observer$.subscribe(event => {
        console.log(event)
    })
}

export function fromObserver() {
    const promise = Promise.resolve(1);
    from(promise).subscribe(x => console.log(x))
}

/**
 * fromEventPattern
 * Creates an Observable from an API based on addHandler/removeHandler functions.
 */
export function fromEventPatternObserver() {
    const addClickListener = handler => {
        document.addEventListener('click', handler)
    };
    const removeClickListener = handler => {
        document.removeEventListener('click', handler)
    };
    const clicks$ = fromEventPattern(
        addClickListener,
        removeClickListener
    );
    clicks$.subscribe(x => console.log(x))
}

/**
 * iif
 * Decides at subscription time which Observable will actually be subscribed.
 */
export function iifObserver() {
    const observer$ = iif(
        () => Math.random() > 0.5,
        of(123)
    )
    observer$.subscribe(
        value => console.log(value),
        error => console.log(error),
        () => console.log('completed')
    )
}

export function intervalObserver() {
    interval(2000)
        .pipe(take(4))
        .subscribe(x => console.log(x))
}


/**
 * merge
 * Creates an output Observable which concurrently emits
 * all values from every given input Observable.
 * Flattens multiple Observables together by blending their values into one Observable.
 */
export function mergeObserver() {
    const timer1$ = interval(1000).pipe(take(5), map(x =>'timer1----' + x));
    const timer2$ = interval(2000).pipe(take(3), map(x =>'timer2----' + x));
    const timer3$ = interval(500).pipe(take(9), map(x =>'timer3----' + x));
    merge(timer1$, timer2$, timer3$)
        .subscribe(value => console.log(value))
}

/**
 * of
 */
export function ofObserver() {
    of(1, {a: 1}, 'sss').subscribe(x => console.log(x))
}

/**
 * onErrorResumeNext
 * When any of the provided Observable emits an complete or error notification,
 * it immediately subscribes to the next one that was passed.
 */
export function onErrorResumeNextObserver() {
    onErrorResumeNext(
        interval(1000).pipe(
            take(4),
            map(x => {
                if (x === 2) throw new Error('error');
                return x
            })
        ),
        of('ssss')
    ).subscribe(x => console.log(x));
}

/**
 * pairs
 * Convert an object into an observable sequence of [key, value]
 * pairs using an optional IScheduler to enumerate the object.
 */
export function pairsObserver() {
    pairs({x: 1, y: 2}).subscribe(value => console.log(value))
}

/**
 * race
 * Returns an Observable that mirrors the first source Observable to emit an item.
 */
export function raceObserver() {
    const timer1$ = interval(1000).pipe(take(5), map(x =>'timer1----' + x));
    const timer2$ = interval(2000).pipe(take(3), map(x =>'timer2----' + x));
    const timer3$ = interval(500).pipe(take(9), map(x =>'timer3----' + x));
    race(timer1$, timer2$, timer3$)
        .subscribe(value => console.log(value))
}

/**
 * range
 * Creates an Observable that emits a sequence of numbers within a specified range.
 */
export function rangeObserver() {
    range(5, 10).subscribe(v => console.log(v))
}


/**
 * throwError
 * Creates an Observable that emits no items to the Observer and immediately
 * emits an error notification.
 */
export function throwErrorObserver() {
    interval(1000).pipe(
        take(7),
        mergeMap(x =>
            x === 3 ?
                throwError(new Error('error')):
                of ('mergemap---' + x)
        )
    )
        .subscribe(
            value => console.log(value),
            error => console.log(error),
            () => console.log('complete')
        )
}

/**
 * timer
 * Creates an Observable that starts emitting after an initialDelay and emits
 * ever increasing numbers after each period of time thereafter.
 */
export function timerObserver() {
    // timer(3000, 1000).pipe(take(4)).subscribe(x => console.log(x))
    timer(3000)
        .subscribe(x => console.log(x))
}

/**
 * zip
 * Combines multiple Observables to create an Observable whose values are calculated from the values,
 * in order, of each of its input Observables.
 */
export function zipObserver() {
    const of1$ = of(1, 2, 3);
    const of2$ = of('xxx', 'yyy', 'zzz');
    const of3$ = of(true, false, false);
    zip(of1$, of2$, of3$).subscribe(value => console.log(value))
}


/**
 * auditTime
 * Ignores source values for duration milliseconds, then emits the most recent value
 * from the source Observable, then repeats this process.
 */
export function auditTimeOperator() {
    interval(1000).pipe(
        take(10),
        map(x => {console.log('origin--' + x); return x}),
        auditTime(1500)
    ).subscribe(x => console.log(x))
}


/**
 * buffer
 * Buffers the source Observable values until closingNotifier emits.
 */
export function bufferOperator() {
    const clicks = fromEvent(document, 'click');
    const interval$ = interval(1000).pipe(take(20));
    const buffered = interval$.pipe(buffer(clicks));
    buffered.subscribe(x => console.log(x));
}

/**
 * bufferCount
 * Buffers the source Observable values until the size hits the maximum bufferSize given.
 * Collects values from the past as an array, and emits that array only when
 * its size reaches bufferSize.
 */
export function bufferCountOperator() {
    const clicks = fromEvent(document, 'click');
    clicks.pipe(bufferCount(2, 1)).subscribe(x => console.log(x))
}

/**
 * bufferTime
 * Buffers the source Observable values for a specific time period.
 * Collects values from the past as an array, and emits those arrays periodically in time.
 */
export function bufferTimeOperator() {
    const clicks = fromEvent(document, 'click');
    clicks.pipe(bufferTime(2000, 5000), take(4)).subscribe(x => console.log(x))
}

/**
 * bufferToggle
 * Collects values from the past as an array. Starts collecting only when opening emits,
 * and calls the closingSelector function to get an Observable that tells when to close the buffer.
 */
export function bufferToggleOperator() {
    const clicks = fromEvent(document, 'click');
    const openings = interval(2000).pipe(take(4));
    const buffered = clicks.pipe(bufferToggle(openings, i =>
        i % 2 ? interval(1000) : empty()
    ));
    buffered.subscribe(x => console.log(x))
}

/**
 * bufferWhen
 * Buffers the source Observable values, using a factory function of closing Observables
 * to determine when to close, emit, and reset the buffer.
 */
export function bufferWhenOperator() {
    const clicks = fromEvent(document, 'click');
    const buffered = clicks.pipe(bufferWhen(() =>
        interval(1000 + Math.random() * 4000)
    ), take(4));
    buffered.subscribe(x => console.log(x));
}

/**
 * combineAll
 *
 */
export function combineAllOperator() {
    of([1, 2, 3]).pipe(
        mergeMap(() => of('s', 'd', 'w')),
        combineAll()
    ).subscribe(x => console.log(x))
}

// export function combineLatestOperator() {
//     interval(1000).pipe(
//         combineLatest(range(1, 10), x => x+1)
//     ).subscribe(x => console.log(x))
// }

/**
 * concatMap
 * Projects each source value to an Observable which is merged in the output Observable,
 * in a serialized fashion waiting for each one to complete before merging the next.
 */
export function concatMapOperator() {
    interval(1000).pipe(
        take(4),
        concatMap(() => range(5, 10))
    ).subscribe(x => console.log(x))
}

/**
 * concatMapTo
 * Projects each source value to the same Observable which is merged multiple times
 * in a serialized fashion on the output Observable.
 */
export function concatMapToOperator() {
    interval(1000).pipe(
        take(4),
        concatMapTo(range(5, 10))
    ).subscribe(x => console.log(x))
}

/**
 * count
 * Tells how many values were emitted, when the source completes.
 */
export function countOperator() {
    interval(1000).pipe(
        take(4),
        count(x => x % 2 === 1)
    ).subscribe(x => console.log(x))
}

/**
 * debounce
 * Emits a value from the source Observable only after a particular time span determined
 * by another Observable has passed without another source emission.
 */
export function debounceOperator() {
    interval(500).pipe(
        take(5),
        debounce(() => interval(1000))
    ).subscribe(x => console.log(x))
}

export function debounceTimeOperator() {
    interval(500).pipe(
        take(5),
        debounceTime(1000)
    ).subscribe(x => console.log(x))
}

/**
 * defaultIfEmpty
 * Emits a given value if the source Observable completes without emitting any
 * next value, otherwise mirrors the source Observable.
 */
export function defaultIfEmptyOperator() {
    interval(1000).pipe(
        take(4),
        defaultIfEmpty('oooo')
    ).subscribe(x => console.log(x))
}

/**
 * delay
 * Delays the emission of items from the source Observable by a given timeout or until a given Date.
 */
export function delayOperator() {
    interval(1000).pipe(
        take(4),
        delay(5000)
    ).subscribe(x => console.log(x))
}

export function delayWhenOperator() {
    interval(1000).pipe(
        take(4),
        delayWhen(() => interval(5000))
    ).subscribe(x => console.log(x))
}

/**
 * distinct
 * Returns an Observable that emits all items emitted by the source Observable that are
 * distinct by comparison from previous items.
 */
export function distinctOperator() {
    of(
        {id: 1, name: 's'},
        {id: 2, name: 'w'},
        {id: 1, name: 'o'},
        {id: 1, name: 'h'}
    ).pipe(
        distinct(x => x.id)
    ).subscribe(x => console.log(x))
}

/**
 * distinctUntilChanged
 * Returns an Observable that emits all items emitted by the source Observable that are
 * distinct by comparison from the previous item.
 */
export function distinctUntilChangedOperator() {
    of(
        {id: 1, name: 's'},
        {id: 2, name: 'w'},
        {id: 1, name: 'o'},
        {id: 1, name: 'h'}
    ).pipe(
        distinctUntilChanged((x, y) => x.id === y.id)
    ).subscribe(x => console.log(x))
}

/**
 * distinctUntilKeyChanged
 * Returns an Observable that emits all items emitted by the source Observable that are
 * distinct by comparison from the previous item, using a property accessed by using the
 * key provided to check if the two items are distinct.
 */
export function distinctUntilKeyChangedOperator() {
    of(
        {id: 1, name: 's'},
        {id: 2, name: 'w'},
        {id: 1, name: 'o'},
        {id: 1, name: 'h'}
    ).pipe(
        distinctUntilKeyChanged('id')
    ).subscribe(x => console.log(x))
}

/**
 * elementAt
 * Emits the single value at the specified index in a sequence of emissions
 * from the source Observable.
 */
export function elementAtOperator() {
    of('s', 'w', 'g').pipe(
        //take(5),
        elementAt(2)
    ).subscribe(x => console.log(x))
}

/**
 * endWith
 * Returns an Observable that emits the items you specify as arguments after it finishes
 * emitting items emitted by the source Observable.
 */
export function endWithOperator() {
    range(0, 4).pipe(
        endWith('done')
    ).subscribe(x => console.log(x))
}

/**
 * every
 * Returns an Observable that emits whether or not every item of the source satisfies
 * the condition specified.
 */
export function everyOperator() {
   of (1, 2, 3).pipe(
       every(x => x > 2)
   ).subscribe(x => console.log(x))
}

/**
 * exhaust
 * Converts a higher-order Observable into a first-order Observable by dropping
 * inner Observables while the previous inner Observable has not yet completed.
 */
// export function exhaustOperator() {
//     interval(1000).pipe(4).pipe(
//         map(x => of(x + 'sss'))
//     ).pipe(exhaust()).subscribe(x => console.log(x))
// }


export function filterOperator() {
    of(1, 2, 3).pipe(
        filter(x => x >=2)
    ).subscribe(x => console.log(x))
}

/**
 * finalize
 * Returns an Observable that mirrors the source Observable, but will call a
 * specified function when the source terminates on complete or error.
 */
export function finalizeOperator() {
    of(1, 2, 3).pipe(
        finalize(() => console.log('finalize'))
    ).subscribe(x => console.log(x))
}

/**
 * find
 * Emits only the first value emitted by the source Observable that meets some condition.
 */
export function findOperator() {
    of(1, 2, 3).pipe(
        find(x => x >=2)
    ).subscribe(x => console.log(x))
}

/**
 * findIndex
 * Emits only the index of the first value emitted by the source Observable that meets some condition.
 */
export function findIndexOperator() {
    of(1, 2, 3).pipe(
        findIndex(x => x >= 2)
    ).subscribe(x => console.log(x))
}

/**
 * first
 * Emits only the first value (or the first value that meets some condition)
 * emitted by the source Observable.
 */
export function firstOperator() {
    of(1, 2, 3).pipe(
        first(x => x >= 2)
    ).subscribe(x => console.log(x))
}

/**
 * flatMap
 * Projects each source value to an Observable which is merged in the output Observable.
 */
export function flatMapOperator() {
    of('a', 'b', 'c').pipe(
        flatMap(x => interval(1000).pipe(take(4), map(i => x + i)))
    ).subscribe(x => console.log(x))
}

/**
 * groupBy
 * Groups the items emitted by an Observable according to a specified criterion,
 * and emits these grouped items as GroupedObservables, one GroupedObservable per group.
 */
export function groupByOperator() {
    of(
        {id: 1, name: 's'},
        {id: 2, name: 'd'},
        {id: 3, name: 'g'},
        {id: 1, name: 'f'}
    ).pipe(
        groupBy(o => o.id),
        flatMap(group$ => group$.pipe(
            reduce((acc, cur) => [...acc, cur], [])
        ))
    ).subscribe(x => console.log(x))
}

/**
 * ignoreElement
 * Ignores all items emitted by the source Observable and only passes calls of complete or error.
 */
export function ignoreElementsOperator() {
    of(1, 2, 3).pipe(
        ignoreElements()
    ).subscribe(
        x => console.log(x),
        err => console.log(err),
        () => console.log('complete')
    )
}

export function isEmptyOperator() {
    empty().pipe(
        isEmpty()
    ).subscribe(
        x => console.log(x),
        err => console.log(err),
        () => console.log('complete')
    )
}

export function lastOperator() {
    of(1, 2, 3).pipe(
        last(x => x >=2)
    ).subscribe(x => console.log(x))
}

/**
 * mapTo
 * Emits the given constant value on the output Observable every time the source
 * Observable emits a value.
 */
export function mapToOperator() {
    of(1, 2, 3).pipe(
        mapTo('ssss')
    ).subscribe(x => console.log(x))
}

/**
 * max
 * The Max operator operates on an Observable that emits numbers
 * (or items that can be compared with a provided function), and when
 * source Observable completes it emits a single
 * item: the item with the largest value.
 */
export function maxOperator() {
    of(
        {id: 1, name: 's'},
        {id: 2, name: 'd'},
        {id: 3, name: 'g'},
        {id: 1, name: 'f'}
    ).pipe(
        max((x, y) => x.id > y.id ? 1 : -1)
    ).subscribe(x => console.log(x))
}

export function mergeMapOperator() {
    of('a', 'b', 'c').pipe(
        mergeMap(x => interval(1000).pipe(take(4), map(i => x + i)))
    ).subscribe(x => console.log(x))
}

export function mergeMapToOperator() {
    of('a', 'b', 'c').pipe(
        mergeMapTo(interval(1000).pipe(take(4), map(i => i)))
    ).subscribe(x => console.log(x))
}

/**
 * Applies an accumulator function over the source Observable where the accumulator function
 * itself returns an Observable, then each intermediate Observable returned is
 * merged into the output Observable.
 */
export function mergeScanOperator() {
    of('a', 'b', 'c').pipe(
        mergeScan((acc, curr) => of(acc + curr), 0)
    ).subscribe(x => console.log(x))
}


export function minOperator() {
    of(
        {id: 1, name: 's'},
        {id: 2, name: 'd'},
        {id: 3, name: 'g'},
        {id: 1, name: 'f'}
    ).pipe(
        min((x, y) => x.id > y.id ? 1 : -1)
    ).subscribe(x => console.log(x))
}

/**
 * pairwise
 * Groups pairs of consecutive emissions together and emits them as an array of two values.
 */
export function pairwiseOperator() {
    of(1, 2, 3).pipe(
        pairwise()
    ).subscribe(x => console.log(x))
}

/**
 * partition
 * Splits the source Observable into two, one with values that satisfy a predicate,
 * and another with values that don't satisfy the predicate.
 */
export function partitionOperator() {
    const parts = of(1, 2, 3, 2,4, 5, 2).pipe(
        partition(x => x === 2)
    )
    parts[0].subscribe(x => console.log('parts1:', x))
    parts[1].subscribe(x => console.log('parts2:', x))
}

/**
 * pluck
 * Like map, but meant only for picking one of the nested properties of every emitted object.
 */
export function pluckOperator() {
    of(
        {id: 1, name: 's'},
        {id: 2, name: 'd'},
        {id: 3, name: 'g'},
        {id: 1, name: 'f'}
    ).pipe(
        pluck('name')
    ).subscribe(x => console.log(x))
}

export function raceOperator() {
    const observer1$ = interval(2000).pipe(take(4), startWith(4));
    const observer2$ = interval(1000).pipe(take(3))
    race(observer1$, observer2$).subscribe(x => console.log(x))
}

export function refCountOperator() {
    of(1, 2, 3, 4).pipe(
        refCount()
    ).subscribe(x => console.log(x))
}

/**
 * repeat
 * Returns an Observable that repeats the stream of items emitted by the source
 * Observable at most count times.
 */
export function repeatOperator() {
    of(1, 2, 3, 4).pipe(
        repeat(2)
    ).subscribe(x => console.log(x))
}

/**
 * retry
 * Returns an Observable that mirrors the source Observable with the exception of an
 * error. If the source Observable calls error, this method will resubscribe to the
 * source Observable for a maximum of count resubscriptions (given as a number parameter)
 * rather than propagating the error call.
 */
export function retryOperator() {
    of(1, 2, 3).pipe(
        repeat(2)
    ).subscribe(
        x => console.log(x),
        error => console.log('error---', error)
    )
}

/**
 * sample
 * Emits the most recently emitted value from the source Observable whenever another Observable,
 * the notifier, emits.
 */
export function sampleOperator() {
    interval(1000).pipe(
        take(4),
        sample(of('ssss').pipe(delay(2000)))
    ).subscribe(
        x => console.log(x)
    )
}

/**
 * sampleTime
 * Emits the most recently emitted value from the source Observable within periodic time intervals.
 */
export function sampleTimeOperator() {
    interval(1000).pipe(
        take(4),
        sampleTime(2000)
    ).subscribe(
        x => console.log(x)
    )
}

/**
 * scan
 * Applies an accumulator function over the source Observable,
 * and returns each intermediate result, with an optional seed value.
 */
export function scanOperator() {
    of(1, 2, 3).pipe(
        scan((acc, cur) => cur * acc, 1)
    ).subscribe(x => console.log(x))
}

/**
 * sequenceEqual
 * Compares all values of two observables in sequence using an optional comparor
 * function and returns an observable of a single boolean value representing whether
 * or not the two sequences are equal.
 */
export function sequenceEqualOperator() {
    interval(1000).pipe(
        take(4),
        startWith(1),
        sequenceEqual(of(1))
    ).subscribe(x => console.log(x))
}

export function skipOperator() {
    interval(1000).pipe(
        take(4),
        skip(2)
    ).subscribe(x => console.log(x))
}

export function skipLastOperator() {
    interval(1000).pipe(
        take(4),
        skip(2)
    ).subscribe(x => console.log(x))
}

/**
 * skipUntil
 * Returns an Observable that skips items emitted by the source Observable
 * until a second Observable emits an item.
 */
export function skipUntilOperator() {
    interval(1000).pipe(
        take(4),
        skipUntil(of('sss').pipe(delay(3000)))
    ).subscribe(x => console.log(x))
}

/**
 * Returns an Observable that skips all items emitted by the source Observable as
 * long as a specified condition holds true, but emits all further source items
 * as soon as the condition becomes false.
 */
export function skipWhileOperator() {
    interval(1000).pipe(
        take(4),
        skipWhile((value, index) => {
            console.log(value, index);
            return value > 2
        })
    ).subscribe(x => console.log(x))
}

/**
 * Returns an Observable that emits the items you specify as arguments before it begins
 * to emit items emitted by the source Observable.
 */
export function stateWithOperator() {
    of(1, 2, 3).pipe(
        startWith('sss'),
        endWith('lll')
    ).subscribe(x => console.log(x))
}

/**
 * Projects each source value to an Observable which is merged in the output Observable,
 * emitting values only from the most recently projected Observable.
 */
export function switchMapOperator() {
    of('mmm').pipe(
        switchMap(x => of('sss' + x).pipe(delay(3000)))
    ).subscribe(x => console.log(x))
}

export function switchMapToOperator() {
    of('mmm').pipe(
        switchMapTo(of('sss').pipe(delay(3000)))
    ).subscribe(x => console.log(x))
}

export function takeLastOperator() {
    of(1, 2, 3).pipe(
        takeLast(2)
    ).subscribe(x => console.log(x))
}

/**
 * takeUntil
 * Emits the values emitted by the source Observable until a notifier Observable emits a value.
 */
export function takeUntilOperator() {
    interval(1000).pipe(
        takeUntil(of(33).pipe(delay(4000)))
    ).subscribe(x => console.log(x));
}

export function takeWhileOperator() {
    interval(1000).pipe(
        takeWhile(x => x < 4)
    ).subscribe(x => console.log(x));
}

/**
 * Perform a side effect for every emission on the source Observable, but return an
 * Observable that is identical to the source.
 */
export function tapOperator() {
    interval(1000).pipe(
        takeWhile(x => x < 4),
        tap(x => console.log(x))
    ).subscribe(x => console.log(x));
}

/**
 * throttle
 * Emits a value from the source Observable, then ignores subsequent source values for a duration
 * determined by another Observable, then repeats this process.
 */
export function throttleOperator() {
    interval(1000).pipe(
        take(4),
        throttle(() => interval(2000))
    ).subscribe(x => console.log(x));
}

export function throttleTimeOperator() {
    interval(1000).pipe(
        take(4),
        throttleTime(2000)
    ).subscribe(x => console.log(x));
}

export function timeoutOperator() {
    interval(1000).pipe(
        take(4),
        timeout(2000)
    ).subscribe(
        x => console.log(x),
        error => console.log(error)
    );
}

/**
 * timeoutWith
 * Errors if Observable does not emit a value in given time span, in case of which subscribes
 * to the second Observable.
 */
export function timeoutWithOperator() {
    interval(1000).pipe(
        take(4),
        timeoutWith(1500, range(0, 2))
    ).subscribe(
        x => console.log(x),
        error => console.log(error)
    );
}

export function toArrayOperator() {
    interval(1000).pipe(
        take(4),
        toArray()
    ).subscribe(
        x => console.log(x),
        error => console.log(error)
    );
}

export function windowOperator() {
    const clicks = fromEvent(document, 'click');
    const interval$ = interval(1000);
    const result = clicks.pipe(
        window(interval$),
        map(win => win.pipe(take(2))), // each window has at most 2 emissions
        mergeAll(),              // flatten the Observable-of-Observables
    );
    result.subscribe(x => console.log(x));
}

export function withLatestFromOperator() {
    of(1, 2, 3).pipe(
        withLatestFrom(interval(1000))
    ).subscribe(x => console.log(x));
}

