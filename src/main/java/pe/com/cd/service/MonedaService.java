package pe.com.cd.service;

import pe.com.cd.domain.Moneda;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Moneda.
 */
public interface MonedaService {

    /**
     * Save a moneda.
     *
     * @param moneda the entity to save
     * @return the persisted entity
     */
    Moneda save(Moneda moneda);

    /**
     * Get all the monedas.
     *
     * @return the list of entities
     */
    List<Moneda> findAll();


    /**
     * Get the "id" moneda.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Moneda> findOne(Long id);

    /**
     * Delete the "id" moneda.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the moneda corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<Moneda> search(String query);
}
