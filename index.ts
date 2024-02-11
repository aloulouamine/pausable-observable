import {
  map,
  repeat,
  merge,
  interval,
  filter,
  takeUntil,
  Subject,
} from 'rxjs';

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

setTimeout(() => {
  pause$.next(true);
}, 3000);

setTimeout(() => {
  pause$.next(false);
}, 5000);

merge(missionEvent$, predefinedHigh$).subscribe(console.log);
