import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';

export interface ITest {

  testname: null;
  PointsPossible: null;
  PointsReceived: null;
  Percentage: null;
  Grade: null;
}

@Component({
  selector: 'app-test-score',
  templateUrl: './test-score.component.html',
  styleUrls: ['./test-score.component.css']
})
export class TestScoreComponent implements OnInit {

  tests: Array<any> = [];
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    const test = JSON.parse(localStorage.getItem('tests'));
    if (test && test.length > 0) {
      this.tests = test;
    } else {
      this.tests = await this.LoadTestScores();
    }
    

  }

  async LoadTestScores() {
    const test = await this.http.get('assets/tests.json').toPromise();
    return test.json();
  }

  AddTest() {
    const test: ITest = {
      testname: null,
      PointsPossible: null,
      PointsReceived: null,
      Percentage: null,
      Grade: null

    }
    this.tests.unshift(test);
    this.saveToStoragre();
  }

    deleteTest(index:number) {
    this.tests.splice(index, 1);
    this.saveToStoragre();
  }
saveToStoragre() {
localStorage.setItem('tests', JSON.stringify(this.tests));
}
}
