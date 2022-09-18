import { Method, Parameter, Property, Service, Type } from 'basketry';
import { isForeignKey, isPrimaryKey } from '.';

export class Helper {
  constructor(private readonly service: Service) {}

  getPrimaryKeys(type: Type): Property[] {
    return type.properties.filter((prop) => isPrimaryKey(prop, this.service));
  }

  getForeignKeys(type: Type): Property[] {
    return type.properties.filter((prop) => isForeignKey(prop, this.service));
  }

  getKeyParameters(method: Method): Parameter[] {
    return method.parameters.filter((prop) => isForeignKey(prop, this.service));
  }

  isPrimaryKey(prop: Property): boolean {
    return isPrimaryKey(prop, this.service);
  }

  isForeignKey(obj: Property | Parameter): boolean {
    return isForeignKey(obj, this.service);
  }
}
