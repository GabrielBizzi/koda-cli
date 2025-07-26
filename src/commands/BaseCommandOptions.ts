interface BaseCommandOptions {
  name: string;
  description: string;
  usage: string;
  alias?: string;
}

abstract class BaseCommandMultiArg {
  private readonly name: string;
  private readonly description: string;
  private readonly usage: string;
  private readonly alias: string;

  constructor(options: BaseCommandOptions) {
    const { name, description, usage, alias } = options;
    this.name = name;
    this.description = description;
    this.usage = usage;
    this.alias = alias ?? this.name[0];
  }

  abstract run(...args: string[]): Promise<void>;

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getUsage(): string {
    return this.usage;
  }

  public getAlias(): string {
    return this.alias;
  }
}

export default BaseCommandMultiArg;
