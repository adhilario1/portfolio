/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getPost } from "../graphql/queries";
import { updatePost } from "../graphql/mutations";
const client = generateClient();
export default function PostUpdateForm(props) {
  const {
    id: idProp,
    post: postModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    type: "",
    year: "",
    description: "",
    discipline: "",
    project: "",
    thumbnail_url: "",
    url: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [type, setType] = React.useState(initialValues.type);
  const [year, setYear] = React.useState(initialValues.year);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [discipline, setDiscipline] = React.useState(initialValues.discipline);
  const [project, setProject] = React.useState(initialValues.project);
  const [thumbnail_url, setThumbnail_url] = React.useState(
    initialValues.thumbnail_url
  );
  const [url, setUrl] = React.useState(initialValues.url);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = postRecord
      ? { ...initialValues, ...postRecord }
      : initialValues;
    setTitle(cleanValues.title);
    setType(cleanValues.type);
    setYear(cleanValues.year);
    setDescription(cleanValues.description);
    setDiscipline(cleanValues.discipline);
    setProject(cleanValues.project);
    setThumbnail_url(cleanValues.thumbnail_url);
    setUrl(cleanValues.url);
    setErrors({});
  };
  const [postRecord, setPostRecord] = React.useState(postModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getPost.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPost
        : postModelProp;
      setPostRecord(record);
    };
    queryData();
  }, [idProp, postModelProp]);
  React.useEffect(resetStateValues, [postRecord]);
  const validations = {
    title: [{ type: "Required" }],
    type: [{ type: "Required" }],
    year: [{ type: "Required" }],
    description: [{ type: "Required" }],
    discipline: [{ type: "Required" }],
    project: [],
    thumbnail_url: [],
    url: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title,
          type,
          year,
          description,
          discipline,
          project: project ?? null,
          thumbnail_url: thumbnail_url ?? null,
          url,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updatePost.replaceAll("__typename", ""),
            variables: {
              input: {
                id: postRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PostUpdateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              type,
              year,
              description,
              discipline,
              project,
              thumbnail_url,
              url,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Type"
        isRequired={true}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              type: value,
              year,
              description,
              discipline,
              project,
              thumbnail_url,
              url,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      ></TextField>
      <TextField
        label="Year"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={year}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              type,
              year: value,
              description,
              discipline,
              project,
              thumbnail_url,
              url,
            };
            const result = onChange(modelFields);
            value = result?.year ?? value;
          }
          if (errors.year?.hasError) {
            runValidationTasks("year", value);
          }
          setYear(value);
        }}
        onBlur={() => runValidationTasks("year", year)}
        errorMessage={errors.year?.errorMessage}
        hasError={errors.year?.hasError}
        {...getOverrideProps(overrides, "year")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              type,
              year,
              description: value,
              discipline,
              project,
              thumbnail_url,
              url,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Discipline"
        isRequired={true}
        isReadOnly={false}
        value={discipline}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              type,
              year,
              description,
              discipline: value,
              project,
              thumbnail_url,
              url,
            };
            const result = onChange(modelFields);
            value = result?.discipline ?? value;
          }
          if (errors.discipline?.hasError) {
            runValidationTasks("discipline", value);
          }
          setDiscipline(value);
        }}
        onBlur={() => runValidationTasks("discipline", discipline)}
        errorMessage={errors.discipline?.errorMessage}
        hasError={errors.discipline?.hasError}
        {...getOverrideProps(overrides, "discipline")}
      ></TextField>
      <TextField
        label="Project"
        isRequired={false}
        isReadOnly={false}
        value={project}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              type,
              year,
              description,
              discipline,
              project: value,
              thumbnail_url,
              url,
            };
            const result = onChange(modelFields);
            value = result?.project ?? value;
          }
          if (errors.project?.hasError) {
            runValidationTasks("project", value);
          }
          setProject(value);
        }}
        onBlur={() => runValidationTasks("project", project)}
        errorMessage={errors.project?.errorMessage}
        hasError={errors.project?.hasError}
        {...getOverrideProps(overrides, "project")}
      ></TextField>
      <TextField
        label="Thumbnail url"
        isRequired={false}
        isReadOnly={false}
        value={thumbnail_url}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              type,
              year,
              description,
              discipline,
              project,
              thumbnail_url: value,
              url,
            };
            const result = onChange(modelFields);
            value = result?.thumbnail_url ?? value;
          }
          if (errors.thumbnail_url?.hasError) {
            runValidationTasks("thumbnail_url", value);
          }
          setThumbnail_url(value);
        }}
        onBlur={() => runValidationTasks("thumbnail_url", thumbnail_url)}
        errorMessage={errors.thumbnail_url?.errorMessage}
        hasError={errors.thumbnail_url?.hasError}
        {...getOverrideProps(overrides, "thumbnail_url")}
      ></TextField>
      <TextField
        label="Url"
        isRequired={true}
        isReadOnly={false}
        value={url}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              type,
              year,
              description,
              discipline,
              project,
              thumbnail_url,
              url: value,
            };
            const result = onChange(modelFields);
            value = result?.url ?? value;
          }
          if (errors.url?.hasError) {
            runValidationTasks("url", value);
          }
          setUrl(value);
        }}
        onBlur={() => runValidationTasks("url", url)}
        errorMessage={errors.url?.errorMessage}
        hasError={errors.url?.hasError}
        {...getOverrideProps(overrides, "url")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || postModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || postModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
