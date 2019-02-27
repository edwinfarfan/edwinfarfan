package pe.com.cd.service.impl;

import pe.com.cd.service.TransaccionPersonaService;
import pe.com.cd.domain.TransaccionPersona;
import pe.com.cd.repository.TransaccionPersonaRepository;
import pe.com.cd.repository.search.TransaccionPersonaSearchRepository;
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
 * Service Implementation for managing TransaccionPersona.
 */
@Service
@Transactional
public class TransaccionPersonaServiceImpl implements TransaccionPersonaService {

    private final Logger log = LoggerFactory.getLogger(TransaccionPersonaServiceImpl.class);

    private final TransaccionPersonaRepository transaccionPersonaRepository;

    private final TransaccionPersonaSearchRepository transaccionPersonaSearchRepository;

    public TransaccionPersonaServiceImpl(TransaccionPersonaRepository transaccionPersonaRepository, TransaccionPersonaSearchRepository transaccionPersonaSearchRepository) {
        this.transaccionPersonaRepository = transaccionPersonaRepository;
        this.transaccionPersonaSearchRepository = transaccionPersonaSearchRepository;
    }

    /**
     * Save a transaccionPersona.
     *
     * @param transaccionPersona the entity to save
     * @return the persisted entity
     */
    @Override
    public TransaccionPersona save(TransaccionPersona transaccionPersona) {
        log.debug("Request to save TransaccionPersona : {}", transaccionPersona);
        TransaccionPersona result = transaccionPersonaRepository.save(transaccionPersona);
        transaccionPersonaSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the transaccionPersonas.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TransaccionPersona> findAll() {
        log.debug("Request to get all TransaccionPersonas");
        return transaccionPersonaRepository.findAll();
    }


    /**
     * Get one transaccionPersona by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TransaccionPersona> findOne(Long id) {
        log.debug("Request to get TransaccionPersona : {}", id);
        return transaccionPersonaRepository.findById(id);
    }

    /**
     * Delete the transaccionPersona by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TransaccionPersona : {}", id);        transaccionPersonaRepository.deleteById(id);
        transaccionPersonaSearchRepository.deleteById(id);
    }

    /**
     * Search for the transaccionPersona corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TransaccionPersona> search(String query) {
        log.debug("Request to search TransaccionPersonas for query {}", query);
        return StreamSupport
            .stream(transaccionPersonaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
