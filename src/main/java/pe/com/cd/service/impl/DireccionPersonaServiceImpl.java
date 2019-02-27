package pe.com.cd.service.impl;

import pe.com.cd.service.DireccionPersonaService;
import pe.com.cd.domain.DireccionPersona;
import pe.com.cd.repository.DireccionPersonaRepository;
import pe.com.cd.repository.search.DireccionPersonaSearchRepository;
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
 * Service Implementation for managing DireccionPersona.
 */
@Service
@Transactional
public class DireccionPersonaServiceImpl implements DireccionPersonaService {

    private final Logger log = LoggerFactory.getLogger(DireccionPersonaServiceImpl.class);

    private final DireccionPersonaRepository direccionPersonaRepository;

    private final DireccionPersonaSearchRepository direccionPersonaSearchRepository;

    public DireccionPersonaServiceImpl(DireccionPersonaRepository direccionPersonaRepository, DireccionPersonaSearchRepository direccionPersonaSearchRepository) {
        this.direccionPersonaRepository = direccionPersonaRepository;
        this.direccionPersonaSearchRepository = direccionPersonaSearchRepository;
    }

    /**
     * Save a direccionPersona.
     *
     * @param direccionPersona the entity to save
     * @return the persisted entity
     */
    @Override
    public DireccionPersona save(DireccionPersona direccionPersona) {
        log.debug("Request to save DireccionPersona : {}", direccionPersona);
        DireccionPersona result = direccionPersonaRepository.save(direccionPersona);
        direccionPersonaSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the direccionPersonas.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DireccionPersona> findAll() {
        log.debug("Request to get all DireccionPersonas");
        return direccionPersonaRepository.findAll();
    }


    /**
     * Get one direccionPersona by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DireccionPersona> findOne(Long id) {
        log.debug("Request to get DireccionPersona : {}", id);
        return direccionPersonaRepository.findById(id);
    }

    /**
     * Delete the direccionPersona by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DireccionPersona : {}", id);        direccionPersonaRepository.deleteById(id);
        direccionPersonaSearchRepository.deleteById(id);
    }

    /**
     * Search for the direccionPersona corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DireccionPersona> search(String query) {
        log.debug("Request to search DireccionPersonas for query {}", query);
        return StreamSupport
            .stream(direccionPersonaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
