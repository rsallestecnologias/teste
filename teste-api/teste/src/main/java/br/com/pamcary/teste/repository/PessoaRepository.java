package br.com.pamcary.teste.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.pamcary.teste.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
	
	@Query(	"SELECT p FROM Pessoa p " +
			"WHERE p.nome like :nome_cpf OR p.cpf like :nome_cpf " )
	List<Pessoa> findByNomeRg( @Param( "nome_cpf" ) String nome_cpf );	

}
