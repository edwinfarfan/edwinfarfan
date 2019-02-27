package pe.com.cd.service;

import pe.com.cd.domain.TipoCambio;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TipoCambio.
 */
public interface TipoCambioService {

    /**
     * Save a tipoCambio.
     *
     * @param tipoCambio the entity to save
     * @return the persisted entity
     */
    TipoCambio save(TipoCambio tipoCambio);

    /**
     * Get all the tipoCambios.
     *
     * @return the list of entities
     */
    List<TipoCambio> findAll();


    /**
     * Get the "id" tipoCambio.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TipoCambio> findOne(Long id);

    /**
     * Delete the "id" tipoCambio.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the tipoCambio corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<TipoCambio> search(String query);
}
