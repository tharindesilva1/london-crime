import { DataTypes, Sequelize, Model, Op, WhereOptions } from "sequelize";
import { CrimeType } from "../typings/crime";

const sequelizeInstance = new Sequelize(
  "crime",
  process.env.NEXT_PUBLIC_DB_USERNAME ?? "",
  process.env.NEXT_PUBLIC_DB_PASSWORD,
  {
    host: process.env.NEXT_PUBLIC_DB_HOST,
    port: (process.env.NEXT_PUBLIC_DB_PORT as unknown) as number,
    dialect: "postgres",
    dialectModule: require("pg"),
  }
);

const config = {
  tableName: "crimes",
  sequelize: sequelizeInstance,
};

interface CrimeDbResponse {
  id: string;
  location: { coordinates: number[] };
  type: CrimeType;
}

interface CrimeTypesDbResponse {
  type: CrimeType;
  count: number;
}

class Crime extends Model {
  id!: string;
  date!: Date;
  location!: { coordinates: number[] };
  type!: CrimeType;
  outcome!: string;
  police!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static async findCrimes(
    startDate: Date,
    endDate: Date,
    crimeType?: string
  ): Promise<CrimeDbResponse[]> {
    const whereConditions: WhereOptions<any> = {
      date: {
        [Op.gte]: startDate,
        [Op.lt]: endDate,
      },
    };

    if (crimeType !== CrimeType.ALL) {
      whereConditions.type = {
        [Op.eq]: crimeType,
      };
    }

    const results = await this.findAll({
      attributes: ["id", "location", "type"],
      where: whereConditions,
    });

    return results.map((result: any) => result.get({ plain: true }));
  }

  static getCrimes(ids: string[]) {
    return this.findAll({
      where: {
        id: {
          [Op.any]: ids,
        },
      },
    });
  }

  static async findCrimeTypesInArea(
    startDate: Date,
    endDate: Date,
    xMin: number,
    xMax: number,
    yMin: number,
    yMax: number,
    type?: string
  ): Promise<CrimeTypesDbResponse[]> {
    const results = await this.sequelize!.query(`
      SELECT type , count(type)
      FROM   crimes
      WHERE  location
          && -- intersects
          ST_MakeEnvelope (
              ${yMin}, ${xMin}, -- bounding
              ${yMax}, ${xMax}, -- box limits
              4326)
          ${type && type !== CrimeType.ALL ? `AND type = '${type}'` : ""}
          AND date >= '${startDate.toDateString()}' AND date < '${endDate.toDateString()}'
      GROUP by type
    `);

    return (results[0] as CrimeTypesDbResponse[]) ?? [];
  }
}

Crime.init(
  {
    id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.GEOGRAPHY,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    outcome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    police: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  config
);

export default Crime;
