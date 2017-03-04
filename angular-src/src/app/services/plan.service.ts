import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class PlanService {
  user: any;
  constructor(private http: Http) { }

  // 根据用户Id获取最新的一周计划信息
  getPlansByUserId(userId){
    let headers = new Headers();
    let userIdObj = {
      "userId":userId
    };
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/plans/getplans',userIdObj,{headers: headers})
      .map(res => res.json());
  }

}
