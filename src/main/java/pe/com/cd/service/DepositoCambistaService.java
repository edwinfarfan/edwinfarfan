package pe.com.cd.service;

import pe.com.cd.domain.DepositoCambista;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing DepositoCambista.
 */
public interface DepositoCambistaService {

    /**
     * Save a depositoCambista.
     *
     * @param depositoCambista the entity to save
     * @return the persisted entity
     */
    DepositoCambista save(DepositoCambista depositoCambista);

    /**
     * Get all the depositoCambistas.
     *
     * @return the list of entities
     */
    List<DepositoCambista> findAll();


    /**
     * Get the "id" depositoCambista.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<DepositoCambista> findOne(Long id);

    /**
     * Delete the "id" depositoCambista.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the depositoCambista corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<DepositoCambista> search(String query);
}
