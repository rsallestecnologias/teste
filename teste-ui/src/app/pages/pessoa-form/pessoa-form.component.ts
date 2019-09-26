import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaService } from '../service/pessoa.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pessoa-form',
    templateUrl: './pessoa-form.component.html',
    styleUrls: ['./pessoa-form.component.scss']
})
export class PessoaFormComponent implements OnInit, OnDestroy {

    frmPessoa: FormGroup;

    isEdited: boolean = false;

    localId: string = '';

    inscricao: Subscription;

    constructor(

        private router: Router,
        private formbuild: FormBuilder,
        private ps: PessoaService,
        private activatedRoute: ActivatedRoute,

    ) {

        this.frmPessoa = this.formbuild.group({
            idPessoa: [0],
            nome: ['', [Validators.required]],
            cpf: [''],
            rg: [''],
            cep: [''],
            logradouro: [''],
            numero: [''],
            complemento: [''],
            bairro: [''],
            cidade: [''],
            estado: [''],
            telefone: [''],
            email: ['', [Validators.email]],
            dataUltimaAlteracao: ['']
        });

    }

    ngOnInit(): void {

        this.inscricao = this.activatedRoute.params.subscribe(params => {
            
            this.localId = params['id'];

            if ( this.localId !== '0'){
                
                this.frmPessoa.patchValue( this.ps.getPessoa() );

            }

        });
        
        this.frmPessoa.valueChanges.subscribe(frm => {

            if (this.frmPessoa.valid) {
                this.isEdited = true
            } else {
                this.isEdited = false
            }

        });
    }

    ngOnDestroy() {
        
        this.inscricao.unsubscribe;

    }

    voltar() {

        this.router.navigate(['/list']);

    }

    salvarPessoa(){

        this.ps.salvarPessoa( this.frmPessoa.value ).subscribe( (resp) => this.voltar() ) ;
        
    }

}
