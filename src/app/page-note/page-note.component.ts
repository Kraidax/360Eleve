import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AuthCookie } from '../auth-cookies-handler';
import { ActivatedRoute } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { concatMap, delay, map, of, retry, retryWhen, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-page-note',
  templateUrl: './page-note.component.html',
  styleUrls: ['./page-note.component.css']
})
export class PageNoteComponent{

  public gridApi!: GridApi;
  public rowData!: any[] ;
  public gridColumnApi: any;

  token: any = this.route.snapshot.paramMap.get("token");
  nom: string = "";
  prenom: string = "";
  note: string = "";
  commentaire: string = "";
  
  data: any;
  cookie: any;
  id_projet: any;
  classe: any;
  groupe: any;
  id_groupe: any;
  id_note: any;
  id_noteur: any;
  infos:any = []
  nom_groupe: any;
  nom_projet: any;
  count: number =0;

 public columnDefs: ColDef[] = [
  { field: 'nom', headerName: 'Nom'},
  { field: 'prenom', headerName: 'Prénom'},
  { field: 'note', headerName: 'Note', width : 100, editable : true},
  { field: 'commentaire', headerName: 'Commentaire', width : 400, editable : true, cellEditor : 'agLargeTextCellEditor'}
 ]

 


public defaultColDef: ColDef = {
  sortable: true,
  filter: true,
  resizable: true,
};

@ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  

constructor(private http: HttpClient, private _authCookie: AuthCookie, private route: ActivatedRoute, private router: Router) {}

ngOnInit (){

  console.log("token :",this.token)

}

async onGridReady(params: GridReadyEvent) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
  this.http.get<any>(`http://localhost:4201/api/get_elv_by_grp/${this.token}`, { headers : {"token" : this.token}})
  .subscribe((result)=>{
    console.log(result)
    this.rowData = result
  });
  this.http.get<any>(`http://localhost:4201/api/getid_noteur/${this.token}`, { headers : {"token" : this.token}})
  .subscribe((result)=>{
    this.id_noteur = result
    console.log("id_noteur :", this.id_noteur)
  });
  this.http.get<any>(`http://localhost:4201/api/get_groupe_by_token/${this.token}`, { headers : {"token" : this.token}})
  .subscribe((result)=>{
    this.id_groupe = result
    this.id_projet = this.id_groupe[0].id_projet
    this.nom_groupe = this.id_groupe[0].nom
    
    console.log("id_groupe :", this.id_groupe)
    this.http.get<any>(`http://localhost:4201/api/get_projet_by_token/${this.token}`, { headers : {"token" : this.token}})
      .subscribe((projet)=>{
        this.nom_projet = projet.nom
        console.log(projet)
        console.log("this.nom_groupe :",this.nom_groupe, "et this.nom_projet", this.nom_projet )
      })
  });

}

 envoyer(){
  this.gridApi.forEachNode(async (rowNode, index) => {
    this.note = rowNode.data.note
    this.commentaire = rowNode.data.commentaire
    this.id_note = rowNode.data.id_eleve.toString()
    this.http.put<any>(`http://localhost:4201/api/newnote`, { "id_groupe": this.id_groupe[0].id_groupe.toString(), "id_elvnoteur": this.id_noteur.toString(), "id_elvnote": this.id_note, "note":this.note, "commentaire":this.commentaire },{ headers : {"token" : this.token}})
    .subscribe(
    (error) => {
      console.log('this.count : ', this.count, "et this.rowData.length :", this.rowData.length);
      this.count++;
      if(this.count == this.rowData.length)
        this.router.navigate(["/merci"])
    });
  })
}

}