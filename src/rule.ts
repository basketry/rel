import { Meta, Rule, Violation } from 'basketry';
import { parse } from './rel';

const rule: Rule = (service) => {
  const violations: Violation[] = [];

  function check(obj: { meta?: Meta | undefined }): void {
    const result = parse(obj, service);

    if (result?.violations?.length) {
      violations.push(...result.violations);
    }
  }

  for (const int of service.interfaces) {
    for (const method of int.methods) {
      for (const param of method.parameters) {
        check(param);
      }
    }
  }

  for (const type of service.types) {
    check(type);

    for (const prop of type.properties) {
      check(prop);
    }
  }

  return violations;
};

export default rule;
