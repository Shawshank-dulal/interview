export class Interview {
  constructor(
    public readonly id: string,
    public title: string,
    public duration: string,
    public totalLessons: number,
    public completedLessons: number,
    public participants: Participant[]
  ) {}
}

export class Participant {
  constructor(
    public readonly id: string,
    public name: string,
    public avatarUrl: string,
    public isHost: boolean = false
  ) {}
}