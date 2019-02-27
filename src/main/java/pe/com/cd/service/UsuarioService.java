package pe.com.cd.service;

import pe.com.cd.domain.Usuario;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Usuario.
 */
public interface UsuarioService {

    /**
     * Save a usuario.
     *
     * @param usuario the entity to save
     * @return the persisted entity
     */
    Usuario save(Usuario usuario);

    /**
     * Get all the usuarios.
     *
     * @return the list of entities
     */
    List<Usuario> findAll();


    /**
     * Get the "id" usuario.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Usuario> findOne(Long id);

    /**
     * Delete the "id" usuario.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the usuario corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<Usuario> search(String query);
}
