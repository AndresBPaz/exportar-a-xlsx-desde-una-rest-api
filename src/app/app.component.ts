import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  id: number = 4;
  constructor(private http: HttpClient, private fileSaverService:FileSaverService ) {}

  ngOnInit(){
    let currentDate = new Date();
    let currentDateTime = currentDate.toLocaleString().replace(',','').replace(/ /g,'_').replace(/\//g,'-');

    this.http.get('http://localhost:8080/api/v1/encuestas/export/'+ this.id + '/excel', {responseType: 'blob'}).subscribe(data => {
      console.log("guardando archivo");
      console.log(data);
      this.fileSaverService.save(data, 'encuesta_'+currentDateTime+'.xlsx');
    });
  }
}
