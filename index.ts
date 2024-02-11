import {
  map,
  repeat,
  merge,
  interval,
  filter,
  takeUntil,
  Subject,
  delay,
  tap,
  take,
  finalize,
} from 'rxjs';

let sourceOneCount = 0;
let sourceTwoCount = 0;

const sourceOnePause$ = new Subject();
const ons$ = sourceOnePause$.pipe(filter((v) => !!v));
const offs$ = sourceOnePause$.pipe(filter((v) => !v));

const sourceOne$ = interval(1000).pipe(
  map(() => `Source one count : ${sourceOneCount++}`),
  takeUntil(ons$),
  repeat({ delay: () => offs$ })
);

const sourceTwo$ = interval(1000).pipe(
  delay(5000),
  take(5),
  tap(() => sourceOnePause$.next(true)),
  map(() => `Source Two ${sourceTwoCount++}`),
  finalize(() => sourceOnePause$.next(false))
);

merge(sourceOne$, sourceTwo$).subscribe(console.log);
