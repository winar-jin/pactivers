import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PlanService } from '../../services/plan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: Object;
  userId: any;
  userPlans: any;
  constructor(
    private authservice: AuthService,
    private router: Router,
    private planservice: PlanService
  ) { }

  ngOnInit() {
    this.authservice.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
      err => {
        console.log(err);
        return false;
      });
    this.userId = localStorage.getItem('userId');
    this.planservice.getPlansByUserId(this.userId).subscribe(useritem => {
      this.userPlans = useritem.plans.plans;
    });
    const leftHeight = document.querySelector('.planInAll .left table').clientHeight + 1;
    const rightTable = document.querySelector('.planInAll .right table');
    rightTable.setAttribute('height', leftHeight + 'px');
  }


  createAPlanTr(index, plan, score) {
    const planTr = document.createElement('tr');
    const tdIndex = document.createElement('th');
    tdIndex.textContent = index;
    const tdPlan = document.createElement('td');
    tdPlan.textContent = plan;
    const tdScore = document.createElement('td');
    tdScore.textContent = score;
    planTr.appendChild(tdIndex);
    planTr.appendChild(tdPlan);
    planTr.appendChild(tdScore);
    return planTr;
  }

  insertToTable() {
    const planTable = document.querySelector('#planTable tbody');
    const insertIntotable = document.querySelector('#insertIntotable');
    const tobeInsert = this.createAPlanTr('3', 'Lalala', '8');
    planTable.insertAdjacentElement('beforeend', tobeInsert);
    const leftHeight = document.querySelector('.planInAll .left table').clientHeight + 1;
    const rightTable = document.querySelector('.planInAll .right table');
    rightTable.setAttribute('height', leftHeight + 'px');
    rightTable.classList.add('noBorderLeft');
  }
}
