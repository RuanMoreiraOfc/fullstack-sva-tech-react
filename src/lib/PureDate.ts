export { PureDate };

const instance = new Date();
type Params<K extends keyof typeof instance> = Parameters<typeof instance[K]>;
type ConstructorParams =
  | ConstructorParameters<typeof Date>
  | []
  | [
      number,
      number,
      number | undefined,
      number | undefined,
      number | undefined,
      number | undefined,
      number | undefined,
    ];

function getDays(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

class PureDate extends Date {
  constructor(...params: ConstructorParams) {
    if (params) {
      super(...(params as ConstructorParameters<typeof Date>));
    } else {
      super();
    }
  }

  // *** CUSTOM PROPS

  get asDate() {
    return new Date(this.time);
  }

  get monthTotalUTCDays() {
    return getDays(this.UTCFullYear, this.UTCMonth);
  }

  get monthTotalDays() {
    return getDays(this.fullYear, this.month);
  }

  get firstUTCDateOfMonth() {
    return this.setUTCDate(1);
  }

  get firstDateOfMonth() {
    return this.setDate(1);
  }

  get lastUTCDateOfMonth() {
    return this.setUTCDate(this.monthTotalUTCDays);
  }

  get lastDateOfMonth() {
    return this.setDate(this.monthTotalDays);
  }

  get previousUTCDate() {
    return this.setUTCHours(-24, 0, 0, 0);
  }

  get previousDate() {
    return this.setHours(-24, 0, 0, 0);
  }

  get nextUTCDate() {
    return this.setUTCHours(24, 0, 0, 0);
  }

  get nextDate() {
    return this.setHours(24, 0, 0, 0);
  }

  get lastUTCSeconds() {
    return this.setUTCHours(24, 0, 0, -1);
  }

  get lastSeconds() {
    return this.setHours(24, 0, 0, -1);
  }

  get beforeUTCDateStarts() {
    return this.previousUTCDate.lastUTCSeconds;
  }

  get beforeDateStarts() {
    return this.previousDate.lastSeconds;
  }

  // *** ORIGINAL PROPS

  get time() {
    return this.getTime();
  }

  get UTCDay() {
    return this.getUTCDay();
  }

  get day() {
    return this.getDay();
  }

  get UTCDate() {
    return this.getUTCDate();
  }

  get date() {
    return this.getDate();
  }

  get UTCFullYear() {
    return this.getUTCFullYear();
  }

  get fullYear() {
    return this.getFullYear();
  }

  get UTCHours() {
    return this.getUTCHours();
  }

  get hours() {
    return this.getHours();
  }

  get UTCMilliseconds() {
    return this.getUTCMilliseconds();
  }

  get milliseconds() {
    return this.getMilliseconds();
  }

  get UTCMinutes() {
    return this.getUTCMinutes();
  }

  get minutes() {
    return this.getMinutes();
  }

  get UTCMonth() {
    return this.getUTCMonth();
  }

  get month() {
    return this.getMonth();
  }

  get UTCSeconds() {
    return this.getUTCSeconds();
  }

  get seconds() {
    return this.getSeconds();
  }

  // *** ORIGINAL METHODS

  // @ts-expect-error 2416
  setDate(...params: Params<'setDate'>): PureDate {
    const originalResult = this.asDate.setDate(...params);

    return new PureDate(originalResult);
  }

  // @ts-expect-error 2416
  setFullYear(...params: Params<'setFullYear'>): PureDate {
    const originalResult = this.asDate.setFullYear(...params);

    return new PureDate(originalResult);
  }

  // @ts-expect-error 2416
  setHours(...params: Params<'setHours'>): PureDate {
    const originalResult = this.asDate.setHours(...params);

    return new PureDate(originalResult);
  }

  // @ts-expect-error 2416
  setMilliseconds(...params: Params<'setMilliseconds'>): PureDate {
    const originalResult = this.asDate.setMilliseconds(...params);

    return new PureDate(originalResult);
  }

  // @ts-expect-error 2416
  setMinutes(...params: Params<'setMinutes'>): PureDate {
    const originalResult = this.asDate.setMinutes(...params);

    return new PureDate(originalResult);
  }

  // @ts-expect-error 2416
  setMonth(...params: Params<'setMonth'>): PureDate {
    const originalResult = this.asDate.setMonth(...params);

    return new PureDate(originalResult);
  }

  // @ts-expect-error 2416
  setSeconds(...params: Params<'setSeconds'>): PureDate {
    const originalResult = this.asDate.setSeconds(...params);

    return new PureDate(originalResult);
  }

  // @ts-expect-error 2416
  setTime(...params: Params<'setTime'>): PureDate {
    const originalResult = this.asDate.setTime(...params);

    return new PureDate(originalResult);
  }

  // @ts-expect-error 2416
  setUTCDate(...params: Params<'setUTCDate'>): PureDate {
    const originalResult = this.asDate.setUTCDate(...params);

    return new PureDate(originalResult);
  }

  // @ts-expect-error 2416
  setUTCFullYear(...params: Params<'setUTCFullYear'>): PureDate {
    const originalResult = this.asDate.setUTCFullYear(...params);

    return new PureDate(originalResult);
  }

  // @ts-expect-error 2416
  setUTCHours(...params: Params<'setUTCHours'>): PureDate {
    const originalResult = this.asDate.setUTCHours(...params);

    return new PureDate(originalResult);
  }

  // @ts-expect-error 2416
  setUTCMilliseconds(...params: Params<'setUTCMilliseconds'>): PureDate {
    const originalResult = this.asDate.setUTCMilliseconds(...params);

    return new PureDate(originalResult);
  }

  // @ts-expect-error 2416
  setUTCMinutes(...params: Params<'setUTCMinutes'>): PureDate {
    const originalResult = this.asDate.setUTCMinutes(...params);

    return new PureDate(originalResult);
  }

  // @ts-expect-error 2416
  setUTCMonth(...params: Params<'setUTCMonth'>): PureDate {
    const originalResult = this.asDate.setUTCMonth(...params);

    return new PureDate(originalResult);
  }

  // @ts-expect-error 2416
  setUTCSeconds(...params: Params<'setUTCSeconds'>): PureDate {
    const originalResult = this.asDate.setUTCSeconds(...params);

    return new PureDate(originalResult);
  }
}
