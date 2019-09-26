import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PessoaService } from '../service/pessoa.service';
import { Router } from '@angular/router';
import { Pessoa } from '../model/pessoa';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'pessoalist',
    templateUrl: './pessoa-list.component.html',
    styleUrls: ['./pessoa-list.component.scss']
})
export class PessoaListComponent implements OnInit {

    //pessoas$: Observable<any>;
    pessoas: Array<Pessoa>[];

    frmPesquisa: FormGroup;

    constructor(
        
        private ps: PessoaService,
        private router: Router,
        private formbuild: FormBuilder,

    ) { 

        this.frmPesquisa = this.formbuild.group({
            nomecpf: ['']
        });

    }

    ngOnInit(): void {

        this.ps.listarPessoas().subscribe(
            (resp) => this.pessoas = resp as []
        ) ;

    }

    novaPessoa(){

        this.router.navigate(['/form/0']);

    }

    editarPessoa( pessoa ){

        this.ps.setPessoa( pessoa );

        this.router.navigate(['/form/' + pessoa.idPessoa ]);

    }

    deletarPessoa( id ){

        this.pessoas = [];

        this.ps.deletarPessoa( id ).subscribe(
            (resp) => this.ngOnInit()
        )
        
    }    

    listarPessoasNomeCpf(){
        
        this.ps.listarPessoasNomeCpf( this.frmPesquisa.value.nomecpf ).subscribe(
            (resp) => this.pessoas = resp as []
        ) ;

    }

}
