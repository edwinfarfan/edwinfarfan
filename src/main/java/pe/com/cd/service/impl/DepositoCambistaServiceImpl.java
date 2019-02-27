package pe.com.cd.service.impl;

import pe.com.cd.service.DepositoCambistaService;
import pe.com.cd.domain.DepositoCambista;
import pe.com.cd.repository.DepositoCambistaRepository;
import pe.com.cd.repository.search.DepositoCambistaSearchRepository;
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
 * Service Implementation for managing DepositoCambista.
 */
@Service
@Transactional
public class DepositoCambistaServiceImpl implements DepositoCambistaService {

    private final Logger log = LoggerFactory.getLogger(DepositoCambistaServiceImpl.class);

    private final DepositoCambistaRepository depositoCambistaRepository;

    private final DepositoCambistaSearchRepository depositoCambistaSearchRepository;

    public DepositoCambistaServiceImpl(DepositoCambistaRepository depositoCambistaRepository, DepositoCambistaSearchRepository depositoCambistaSearchRepository) {
        this.depositoCambistaRepository = depositoCambistaRepository;
        this.depositoCambistaSearchRepository = depositoCambistaSearchRepository;
    }

    /**
     * Save a depositoCambista.
     *
     * @param depositoCambista the entity to save
     * @return the persisted entity
     */
    @Override
    public DepositoCambista save(DepositoCambista depositoCambista) {
        log.debug("Request to save DepositoCambista : {}", depositoCambista);
        DepositoCambista result = depositoCambistaRepository.save(depositoCambista);
        depositoCambistaSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the depositoCambistas.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DepositoCambista> findAll() {
        log.debug("Request to get all DepositoCambistas");
        return depositoCambistaRepository.findAll();
    }


    /**
     * Get one depositoCambista by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DepositoCambista> findOne(Long id) {
        log.debug("Request to get DepositoCambista : {}", id);
        return depositoCambistaRepository.findById(id);
    }

    /**
     * Delete the depositoCambista by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DepositoCambista : {}", id);        depositoCambistaRepository.deleteById(id);
        depositoCambistaSearchRepository.deleteById(id);
    }

    /**
     * Search for the depositoCambista corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DepositoCambista> search(String query) {
        log.debug("Request to search DepositoCambistas for query {}", query);
        return StreamSupport
            .stream(depositoCambistaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
