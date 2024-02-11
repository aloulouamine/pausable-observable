import {
  rx,
  map,
  repeat,
  merge,
  interval,
  filter,
  takeUntil,
  Subject,
} from 'rxjs';
const sequence = [
  {
    label: 'item1',
    duration: 500,
  },
  {
    label: 'item2',
    duration: 1000,
  },
];

let missionEventCount = 0;
let predefinedHighCount = 0;

const pause$ = new Subject();
const ons$ = pause$.pipe(filter((v) => !!v));
const offs$ = pause$.pipe(filter((v) => !v));

const missionEvent$ = interval(1000).pipe(
  map(() => `Mission Event count ${missionEventCount++}`),
  takeUntil(ons$),
  repeat({ delay: () => offs$ })
);

const predefinedHigh$ = interval(1000).pipe(
  map(() => `Predefined hight ${predefinedHighCount++}`)
);

rx(merge(missionEvent$, predefinedHigh$)).subscribe(console.log);

setTimeout(() => {
  pause$.next(true);
}, 2000);

setTimeout(() => {
  pause$.next(false);
}, 4000);
