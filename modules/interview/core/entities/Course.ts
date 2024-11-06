export class Course {
  constructor(
    public readonly id: string,
    public title: string,
    public duration: string,
    public totalLessons: number,
    public items: CourseItem[] = []
  ) {}
}

export class CourseItem {
  constructor(
    public readonly id: string,
    public title: string,
    public duration: string,
    public isLocked: boolean = false
  ) {}
}