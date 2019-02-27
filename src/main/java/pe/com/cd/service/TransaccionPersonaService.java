package pe.com.cd.service;

import pe.com.cd.domain.TransaccionPersona;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TransaccionPersona.
 */
public interface TransaccionPersonaService {

    /**
     * Save a transaccionPersona.
     *
     * @param transaccionPersona the entity to save
     * @return the persisted entity
     */
    TransaccionPersona save(TransaccionPersona transaccionPersona);

    /**
     * Get all the transaccionPersonas.
     *
     * @return the list of entities
     */
    List<TransaccionPersona> findAll();


    /**
     * Get the "id" transaccionPersona.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TransaccionPersona> findOne(Long id);

    /**
     * Delete the "id" transaccionPersona.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the transaccionPersona corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<TransaccionPersona> search(String query);
}
