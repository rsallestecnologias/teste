package br.com.pamcary.teste.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.pamcary.teste.model.Pessoa;
import br.com.pamcary.teste.service.PessoaService;

@RestController
@CrossOrigin(maxAge = 4200)
@RequestMapping( "/api/pessoa" )
public class PessoaController {
	
	@Autowired
	PessoaService ps;
	
	@GetMapping( "/getall" )
	@ResponseBody
	public List<Pessoa> getAll(){
		
		return ps.getAll();		
				
	}
	
	@GetMapping( "/get/{id}" )
	@ResponseBody
	public Pessoa getPessoa( @PathVariable("id") Long id ){
		
		return ps.getPessoa( id );		
				
	}

	@PostMapping( value = "/save" )
	@ResponseBody
	public List<Pessoa> save( @RequestBody Pessoa pessoa ) {
		System.out.println("gravando");
		System.out.println(pessoa);
		return ps.save( pessoa );
		
	}
	
	@DeleteMapping( "/delete/{id}" )
	@ResponseBody
	public List<Pessoa> delete( @PathVariable("id") Long id ){
		
		return ps.delete( id );
		
	}
	
	@GetMapping( "/nomecpf/{nomecpf}" )
	@ResponseBody
	public List<Pessoa> getnomecpf( @PathVariable("nomecpf") String nomecpf ){
		
		return ps.findByNomeRg( nomecpf );
		
	}
	
}
