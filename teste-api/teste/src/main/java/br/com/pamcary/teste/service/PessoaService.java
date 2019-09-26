package br.com.pamcary.teste.service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.pamcary.teste.model.Pessoa;
import br.com.pamcary.teste.repository.PessoaRepository;

@Service
public class PessoaService {
	
	@Autowired
	PessoaRepository pr;
	
	/** Retorna uma Pessoa cadastrada */
	public Pessoa getPessoa( Long idPessoa ) {
		
		return pr.getOne( idPessoa );
		
	}
	
	/** Retorna todas as Pessoas cadastradas */
	public List<Pessoa> getAll(){
		
		return pr.findAll() ;
		
	}
	
	/** Salva a Pessoa, se foi enviado o codigo pega o que esta gravado e alterar se nao gera um novo  */
	public List<Pessoa> save( Pessoa pessoa ) {
		
		if ( ( pessoa.getIdPessoa() == null ) || ( pessoa.getIdPessoa().equals( new Long( "0" ) ) ) ) {
			
			pessoa.setDataUltimaAlteracao( new Date() );
			
			pr.save( pessoa );
			
		} else {
			
			Pessoa pessoaLocal = pr.getOne( pessoa.getIdPessoa() );
			
			BeanUtils.copyProperties( pessoa, pessoaLocal );
			
			pessoa.setDataUltimaAlteracao( new Date() );
			
			pr.save( pessoa );
			
		}
		
		return getAll();
		
	}
	
	/** Delete a Pessoa */
	public List<Pessoa> delete( Long idPessoa ) {
		
		pr.delete( pr.getOne( idPessoa ) );
		
		return getAll();
		
	}
	
	/** Pesquisa com base no nome e rg */
	public List<Pessoa> findByNomeRg( String nome_cpf ){
		
		return pr.findByNomeRg( "%" + nome_cpf + "%" );
		
	}

}
