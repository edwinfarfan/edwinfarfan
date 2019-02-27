package pe.com.cd.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A UsuarioRol.
 */
@Entity
@Table(name = "usuario_rol")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "usuariorol")
public class UsuarioRol implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Usuario usuario;

    @OneToOne
    @JoinColumn(unique = true)
    private Rol rol;

    @OneToOne
    @JoinColumn(unique = true)
    private Permiso permiso;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public UsuarioRol usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Rol getRol() {
        return rol;
    }

    public UsuarioRol rol(Rol rol) {
        this.rol = rol;
        return this;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public Permiso getPermiso() {
        return permiso;
    }

    public UsuarioRol permiso(Permiso permiso) {
        this.permiso = permiso;
        return this;
    }

    public void setPermiso(Permiso permiso) {
        this.permiso = permiso;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UsuarioRol usuarioRol = (UsuarioRol) o;
        if (usuarioRol.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), usuarioRol.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UsuarioRol{" +
            "id=" + getId() +
            "}";
    }
}
