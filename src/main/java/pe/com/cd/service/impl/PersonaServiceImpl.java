package pe.com.cd.service.impl;

import pe.com.cd.service.PersonaService;
import pe.com.cd.domain.Persona;
import pe.com.cd.repository.PersonaRepository;
import pe.com.cd.repository.search.PersonaSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Persona.
 */
@Service
@Transactional
public class PersonaServiceImpl implements PersonaService {

    private final Logger log = LoggerFactory.getLogger(PersonaServiceImpl.class);

    private final PersonaRepository personaRepository;

    private final PersonaSearchRepository personaSearchRepository;

    public PersonaServiceImpl(PersonaRepository personaRepository, PersonaSearchRepository personaSearchRepository) {
        this.personaRepository = personaRepository;
        this.personaSearchRepository = personaSearchRepository;
    }

    /**
     * Save a persona.
     *
     * @param persona the entity to save
     * @return the persisted entity
     */
    @Override
    public Persona save(Persona persona) {
        log.debug("Request to save Persona : {}", persona);
        Persona result = personaRepository.save(persona);
        personaSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the personas.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Persona> findAll() {
        log.debug("Request to get all Personas");
        return personaRepository.findAll();
    }


    /**
     * Get one persona by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Persona> findOne(Long id) {
        log.debug("Request to get Persona : {}", id);
        return personaRepository.findById(id);
    }

    /**
     * Delete the persona by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Persona : {}", id);        personaRepository.deleteById(id);
        personaSearchRepository.deleteById(id);
    }

    /**
     * Search for the persona corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Persona> search(String query) {
        log.debug("Request to search Personas for query {}", query);
        return StreamSupport
            .stream(personaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
