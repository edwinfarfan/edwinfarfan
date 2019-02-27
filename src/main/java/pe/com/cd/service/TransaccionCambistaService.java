package pe.com.cd.service;

import pe.com.cd.domain.TransaccionCambista;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TransaccionCambista.
 */
public interface TransaccionCambistaService {

    /**
     * Save a transaccionCambista.
     *
     * @param transaccionCambista the entity to save
     * @return the persisted entity
     */
    TransaccionCambista save(TransaccionCambista transaccionCambista);

    /**
     * Get all the transaccionCambistas.
     *
     * @return the list of entities
     */
    List<TransaccionCambista> findAll();


    /**
     * Get the "id" transaccionCambista.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TransaccionCambista> findOne(Long id);

    /**
     * Delete the "id" transaccionCambista.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the transaccionCambista corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<TransaccionCambista> search(String query);
}
