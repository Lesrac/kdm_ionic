import { PrincipleJSON } from '../model/jsonData/principle_json';
import { Principle, PrincipleType } from '../model/principle';

export class JSONtoObject {

  public static principleJSONToObject(principleJSONs: PrincipleJSON[],
                                      getPrincipleType: (name: string) => Promise<PrincipleType>): Principle[] {
    const principles: Principle[] = [];
    principleJSONs.forEach(principleJSON => {
      const principle = new Principle(principleJSON.name, principleJSON.description);
      getPrincipleType(principleJSON.type).then(principleType => principle.type = principleType);
      principles.push(principle);
    });
    return principles;
  }

}
