package pe.com.cd.service.impl;

import pe.com.cd.service.DepositoPersonaService;
import pe.com.cd.domain.DepositoPersona;
import pe.com.cd.repository.DepositoPersonaRepository;
import pe.com.cd.repository.search.DepositoPersonaSearchRepository;
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
 * Service Implementation for managing DepositoPersona.
 */
@Service
@Transactional
public class DepositoPersonaServiceImpl implements DepositoPersonaService {

    private final Logger log = LoggerFactory.getLogger(DepositoPersonaServiceImpl.class);

    private final DepositoPersonaRepository depositoPersonaRepository;

    private final DepositoPersonaSearchRepository depositoPersonaSearchRepository;

    public DepositoPersonaServiceImpl(DepositoPersonaRepository depositoPersonaRepository, DepositoPersonaSearchRepository depositoPersonaSearchRepository) {
        this.depositoPersonaRepository = depositoPersonaRepository;
        this.depositoPersonaSearchRepository = depositoPersonaSearchRepository;
    }

    /**
     * Save a depositoPersona.
     *
     * @param depositoPersona the entity to save
     * @return the persisted entity
     */
    @Override
    public DepositoPersona save(DepositoPersona depositoPersona) {
        log.debug("Request to save DepositoPersona : {}", depositoPersona);
        DepositoPersona result = depositoPersonaRepository.save(depositoPersona);
        depositoPersonaSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the depositoPersonas.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DepositoPersona> findAll() {
        log.debug("Request to get all DepositoPersonas");
        return depositoPersonaRepository.findAll();
    }


    /**
     * Get one depositoPersona by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DepositoPersona> findOne(Long id) {
        log.debug("Request to get DepositoPersona : {}", id);
        return depositoPersonaRepository.findById(id);
    }

    /**
     * Delete the depositoPersona by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DepositoPersona : {}", id);        depositoPersonaRepository.deleteById(id);
        depositoPersonaSearchRepository.deleteById(id);
    }

    /**
     * Search for the depositoPersona corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DepositoPersona> search(String query) {
        log.debug("Request to search DepositoPersonas for query {}", query);
        return StreamSupport
            .stream(depositoPersonaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
