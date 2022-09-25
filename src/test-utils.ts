import {
  Enum,
  Interface,
  Literal,
  MetaValue,
  Method,
  Parameter,
  Property,
  ReturnType,
  Service,
  Type,
} from 'basketry';

export function lit<T extends string | number | boolean | null>(
  value: T,
): Literal<T> {
  return { value: value };
}

export function service(options?: Partial<Service>): Service {
  return {
    basketry: '1',
    sourcePath: 'path/file.ext',
    title: { value: 'my service' },
    majorVersion: lit(1),
    interfaces: [],
    types: [],
    enums: [],
    unions: [],
    loc: '1;1;0',
    ...options,
  };
}

export function int(options?: Partial<Interface>): Interface {
  return {
    name: 'my_interface',
    methods: [],
    protocols: {
      http: [],
    },
    ...options,
  };
}

export function method(options?: Partial<Method>): Method {
  return {
    name: lit('my_method'),
    parameters: [],
    security: [],
    returnType: undefined,
    loc: '1;1;0',
    ...options,
  };
}

export function parameter(options?: Partial<Parameter>): Parameter {
  return {
    name: lit('my_parameter'),
    isArray: false,
    isPrimitive: true,
    typeName: lit('string'),
    rules: [],
    loc: '1;1;0',
    ...(options as any),
  };
}

export function returnType(options?: Partial<ReturnType>): ReturnType {
  return {
    isArray: false,
    isPrimitive: true,
    typeName: lit('string'),
    rules: [],
    loc: '1;1;0',
    ...(options as any),
  };
}

export function type(options?: Partial<Type>): Type {
  return {
    name: lit('my_method'),
    properties: [property()],
    rules: [],
    loc: '1;1;0',
    ...options,
  };
}

export function property(options?: Partial<Property>): Property {
  return {
    name: lit('my_property'),
    isArray: false,
    isPrimitive: true,
    typeName: lit('string'),
    rules: [],
    loc: '1;1;0',
    ...(options as any),
  };
}

export function e(options?: Partial<Enum>): Enum {
  return {
    name: lit('my_enum'),
    values: [enumValue(lit('some_value')), enumValue(lit('other_value'))],
    loc: '1;1;0',
    ...options,
  };
}

export function enumValue(options?: Partial<Literal<string>>): Literal<string> {
  return {
    value: 'my_enum_value',
    loc: '1;1;0',
    ...options,
  };
}

export function primaryKey(): MetaValue {
  return {
    key: lit('rel'),
    value: { value: { primaryKey: true } },
  };
}

export function foreignKey(fkType: string, fkProp: string): MetaValue {
  return {
    key: lit('rel'),
    value: { value: { foreignKey: { type: fkType, property: fkProp } } },
  };
}

export function edge(a: string, b: string): MetaValue {
  return {
    key: lit('rel'),
    value: { value: { edge: [a, b] } },
  };
}
