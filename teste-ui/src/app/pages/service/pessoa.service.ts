import { Injectable }   from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';

import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { Pessoa } from '../model/pessoa';
import { Router } from '@angular/router';

@Injectable()
export class PessoaService {
  
    private serviceUrl = 'http://localhost:8080/api/pessoa/';

    private localPessoa: Pessoa;
  
  constructor(
      
    private http: HttpClient,
    private router: Router

      ) { }
  
  listarPessoas(): Observable<Pessoa[]> {
    
    return this.http.get<Pessoa[]>( this.serviceUrl + 'getall' );

  }

  listarPessoasNomeCpf( nomecpf ): Observable<Pessoa[]> {

    if ( nomecpf === '' ){
      
      return this.listarPessoas();
      
    }

    return this.http.get<Pessoa[]>( this.serviceUrl + 'nomecpf/' + nomecpf );

  }

  setPessoa( pessoa ){

    this.localPessoa = pessoa;    

  }

  getPessoa(): Pessoa{
    
    return this.localPessoa;

  }

  deletarPessoa( id ): Observable<Pessoa[]>{

    return this.http.delete<Pessoa[]>( this.serviceUrl + 'delete/' + id );

  }

  salvarPessoa( pessoa ): Observable<Pessoa[]>{
    
    const headers = new HttpHeaders()
    .set("Content-type", 'application/json')

    return this.http.post<Pessoa[]>( this.serviceUrl + 'save', pessoa, {headers} );

  }
  
}