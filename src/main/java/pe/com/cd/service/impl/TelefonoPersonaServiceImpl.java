package pe.com.cd.service.impl;

import pe.com.cd.service.TelefonoPersonaService;
import pe.com.cd.domain.TelefonoPersona;
import pe.com.cd.repository.TelefonoPersonaRepository;
import pe.com.cd.repository.search.TelefonoPersonaSearchRepository;
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
 * Service Implementation for managing TelefonoPersona.
 */
@Service
@Transactional
public class TelefonoPersonaServiceImpl implements TelefonoPersonaService {

    private final Logger log = LoggerFactory.getLogger(TelefonoPersonaServiceImpl.class);

    private final TelefonoPersonaRepository telefonoPersonaRepository;

    private final TelefonoPersonaSearchRepository telefonoPersonaSearchRepository;

    public TelefonoPersonaServiceImpl(TelefonoPersonaRepository telefonoPersonaRepository, TelefonoPersonaSearchRepository telefonoPersonaSearchRepository) {
        this.telefonoPersonaRepository = telefonoPersonaRepository;
        this.telefonoPersonaSearchRepository = telefonoPersonaSearchRepository;
    }

    /**
     * Save a telefonoPersona.
     *
     * @param telefonoPersona the entity to save
     * @return the persisted entity
     */
    @Override
    public TelefonoPersona save(TelefonoPersona telefonoPersona) {
        log.debug("Request to save TelefonoPersona : {}", telefonoPersona);
        TelefonoPersona result = telefonoPersonaRepository.save(telefonoPersona);
        telefonoPersonaSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the telefonoPersonas.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TelefonoPersona> findAll() {
        log.debug("Request to get all TelefonoPersonas");
        return telefonoPersonaRepository.findAll();
    }


    /**
     * Get one telefonoPersona by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TelefonoPersona> findOne(Long id) {
        log.debug("Request to get TelefonoPersona : {}", id);
        return telefonoPersonaRepository.findById(id);
    }

    /**
     * Delete the telefonoPersona by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TelefonoPersona : {}", id);        telefonoPersonaRepository.deleteById(id);
        telefonoPersonaSearchRepository.deleteById(id);
    }

    /**
     * Search for the telefonoPersona corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TelefonoPersona> search(String query) {
        log.debug("Request to search TelefonoPersonas for query {}", query);
        return StreamSupport
            .stream(telefonoPersonaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
