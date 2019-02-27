package pe.com.cd.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A TransaccionCambista.
 */
@Entity
@Table(name = "transaccion_cambista")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "transaccioncambista")
public class TransaccionCambista implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "impuesto", precision = 10, scale = 2)
    private BigDecimal impuesto;

    @Column(name = "estado")
    private String estado;

    @Column(name = "fecha")
    private LocalDate fecha;

    @OneToOne
    @JoinColumn(unique = true)
    private TransaccionPersona transaccionPersona;

    @OneToOne
    @JoinColumn(unique = true)
    private DepositoCambista idDepositoCambista;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getImpuesto() {
        return impuesto;
    }

    public TransaccionCambista impuesto(BigDecimal impuesto) {
        this.impuesto = impuesto;
        return this;
    }

    public void setImpuesto(BigDecimal impuesto) {
        this.impuesto = impuesto;
    }

    public String getEstado() {
        return estado;
    }

    public TransaccionCambista estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public TransaccionCambista fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public TransaccionPersona getTransaccionPersona() {
        return transaccionPersona;
    }

    public TransaccionCambista transaccionPersona(TransaccionPersona transaccionPersona) {
        this.transaccionPersona = transaccionPersona;
        return this;
    }

    public void setTransaccionPersona(TransaccionPersona transaccionPersona) {
        this.transaccionPersona = transaccionPersona;
    }

    public DepositoCambista getIdDepositoCambista() {
        return idDepositoCambista;
    }

    public TransaccionCambista idDepositoCambista(DepositoCambista depositoCambista) {
        this.idDepositoCambista = depositoCambista;
        return this;
    }

    public void setIdDepositoCambista(DepositoCambista depositoCambista) {
        this.idDepositoCambista = depositoCambista;
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
        TransaccionCambista transaccionCambista = (TransaccionCambista) o;
        if (transaccionCambista.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transaccionCambista.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransaccionCambista{" +
            "id=" + getId() +
            ", impuesto=" + getImpuesto() +
            ", estado='" + getEstado() + "'" +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
