package pe.com.cd.service;

import pe.com.cd.domain.DepositoPersona;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing DepositoPersona.
 */
public interface DepositoPersonaService {

    /**
     * Save a depositoPersona.
     *
     * @param depositoPersona the entity to save
     * @return the persisted entity
     */
    DepositoPersona save(DepositoPersona depositoPersona);

    /**
     * Get all the depositoPersonas.
     *
     * @return the list of entities
     */
    List<DepositoPersona> findAll();


    /**
     * Get the "id" depositoPersona.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<DepositoPersona> findOne(Long id);

    /**
     * Delete the "id" depositoPersona.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the depositoPersona corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<DepositoPersona> search(String query);
}
